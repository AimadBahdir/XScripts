# <p align="center">XGit</p>

This is a versatile Bash script designed to help you manage Git repositories with greater flexibility. With this script, you can commit changes to a Git repository with custom dates. It includes three distinct functionalities:

* Update old commit dates: This option allows you to modify the date of an existing commit. This can be useful if you need to change the timestamp of an older commit or if you want to maintain consistency across a series of commits.

* Set a custom date for new commits: This option enables you to set a custom date for a new commit that you are about to create. You will be prompted to provide a date in the format MM/DD/YYYY, as well as a commit message.

* Commit a range of commits with different dates: This option is useful if you want to commit a range of changes with different dates. You can provide a comma-separated list of dates in the format MM/DD/YYYY, and the script will automatically commit each change with the corresponding date.

By providing these options, the script allows for greater control and flexibility over your Git repository management, making it easier to work with your codebase efficiently and effectively.

## Requirements

The following requirements must be met in order to use this Bash script:

* Git must be installed and configured on the system where the script will be run.
* The script must be run in a directory that is a Git repository (i.e., a directory that contains a .git folder).
* The curl command must be installed on the system if you plan to use the `-l` option to populate a range of commit dates in the README file.

## Usage

### Installation

To use the `xgit` command, you first need to install the script by running the following command in your terminal:

```http
    curl -L https://bit.ly/initxgit | bash
```
### Options

`-n DATE`: Commits changes to the repository with the specified date and commit message. The date must be in the format MM/DD/YYYY.

Example usage:

```bash
    xgit -n 01/01/2023
```

`-l DATES` : Create random commits in the specified repository for the specified dates. This option was created with a special purpose in mind: if you want to draw a pattern with commits on your contributions calendar on GitHub, you can use this option to easily create the necessary commits for each day of your pattern.

Example usage:

```bash
    xgit -l 01/01/2023,01/02/2023,01/03/2023 ...
```

`-u COMMIT DATE`: Updates the commit date of an existing commit in the repository. The commit must exist, and the date must be in the format MM/DD/YYYY.

Example usage:

```bash
    xgit -u 1234567890abcdef 01/01/2023
```

Thank you for using xgit! We hope this tool helps you manage your Git commits with ease. If you have any questions, feedback, or suggestions for improvement, please feel free to open an issue on our GitHub repository. Happy coding 🎉!

<p align="center"><br/>
    <a href="https://github.com/AimadBahdir/XScripts#gh-dark-mode-only" title="XScripts"><img alt="XScripts" src="../../assets/xslight.svg#gh-dark-mode-only" width="150" /></a>
    <a href="https://github.com/AimadBahdir/XScripts#gh-light-mode-only" title="XScripts"><img alt="XScripts" src="../../assets/xsdark.svg#gh-light-mode-only" width="150" /></a>
</p>