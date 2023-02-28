#!/bin/bash

#REPLASE SVG
if [ ! -d ".git" ]; then
  echo "You are not in a Git directory";
  exit 1;
fi

function is_valid_date {
  local date=$1;
  if ! [[ $date =~ ^[0-9]{2}/[0-9]{2}/[0-9]{4}$ ]]; then
    echo "Invalid date format: $date. Please use format MM/DD/YYYY." >&2
    exit 1
  fi
}

function date_formatter {
  local hours=$(( $RANDOM % 24 ));
  local minutes=$(( $RANDOM % 60 ));
  local seconds=$(( $RANDOM % 60 ));
  echo "$(date -d "$1 $hours:$minutes:$seconds" "+%a %b %e %H:%M:%S %Y %z")";
}

function commit {
  local formatted_date=$(date_formatter "$1")
  export GIT_AUTHOR_DATE="$formatted_date";
  export GIT_COMMITTER_DATE="$formatted_date";
  git commit -m "$2";
}

while getopts ":n:l:u:m:" opt; do
  case ${opt} in
    n )
      date="$OPTARG";
      is_valid_date $date;
      read -p "Set a commit message: " message;
      commit "$date" "$message";
      ;;
    l )
      IFS=',' read -ra dates <<< "$OPTARG"
      num_dates=${#dates[@]};
      echo -n "" >| README.md;
      for i in "${!dates[@]}"
      do
        is_valid_date ${dates[$i]}
        if [ -s "README.md" ]; then
            echo -n "" >| README.md;
        else
            echo -n "xGit" >| README.md;
        fi
        if [ $i -eq $((num_dates - 1)) ]; then
            echo -n $(curl -sS https://raw.githubusercontent.com/AimadBahdir/XScripts/main/linux/XGit/README.md) >| README.md;
        fi
        git add README.md;
        commit "${dates[$i]}" "${dates[$i]}"
      done
      ;;
    u )
      args=("$@")
      commit=${args[1]}
      date=${args[2]}
      is_valid_date $date
      date=$(date_formatter "$date")
      if ! git rev-parse --quiet --verify $commit > /dev/null; then
        echo "Commit $commit not found" >&2
        exit 1
      fi
      git filter-branch -f --env-filter "
        if [ \$GIT_COMMIT = $commit ]; then
            export GIT_AUTHOR_DATE=\"$date\"
            export GIT_COMMITTER_DATE=\"$date\"
        fi" > /dev/null 2>&1;
      ;;
    \? )
      echo "Invalid option: -$OPTARG" 1>&2
      exit 1
      ;;
    : )
      echo "Option -$OPTARG requires an argument." 1>&2
      exit 1
      ;;
  esac
done
