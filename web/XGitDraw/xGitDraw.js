if ( window.location.pathname.split("/").length === 2 ) {
    const style = document.createElement("style");
    style.innerHTML = `
        .ContributionCalendar.days-selected .ContributionCalendar-day { opacity: 1; cursor: pointer;}
        button#ccmd {
            border: none;
            border-radius: .5rem;
            background-color: #161b22;
            padding: .3rem 1rem;
            margin-right: .5rem;
        }
    `;
    document.head.appendChild(style);
    let selectedDates = {};
    let cmdbtn = document.createElement("button");

    cmdbtn.setAttribute("id", "ccmd");
    cmdbtn.setAttribute("class", "float-left");
    cmdbtn.innerText = "copy command";
    cmdbtn.addEventListener("click", (e) => {
        navigator.clipboard.writeText(`xgit -l "${Object.values(selectedDates).filter(e => e.dates.length > 0).map(e => e.dates.join()).join()}"`);
        e.target.innerText = "command copied";
    });
    document.querySelectorAll(".js-calendar-graph > div")[1].prepend(cmdbtn);

    const getCntrLevel = (cntrlvl) => {
        const cntrbs = Object.values(selectedDates).map(e => e.level);
        const res = Math.floor(cntrlvl / Math.max(...cntrbs) * 4);
        return res == 0 && cntrlvl > 0 ? 1 : res;
    }

    document.querySelector(".svg-tip").remove();
    const updateCalendar = (setEvents = false) => Array.from(
        document.querySelectorAll("td.ContributionCalendar-day"))
        .forEach((e, k) => {
            let data = e.textContent.split(" ")[0];
            if (e.getAttribute("data-value") === null)
            {
                data = data === "No" ? 0 : Number(data);
                e.setAttribute("data-value", data);
            }
            else
                data = Number(e.getAttribute("data-value"));
            if (selectedDates[`${k}`] === undefined)
            {
                e.setAttribute("key", `${k}`);
                selectedDates[`${k}`] = {dates: [], level: Number(e.getAttribute("data-level"))}
            }
            e.setAttribute("data-level", getCntrLevel(selectedDates[`${k}`].level));
            e.setAttribute("class", "ContributionCalendar-day");
            if (setEvents)
            {
                e.addEventListener("click", () => {
                    e.setAttribute("data-value", Number(e.getAttribute("data-value")) + 1);
                    const date = e.getAttribute("data-date").split("-");
                    selectedDates[e.getAttribute("key")] = {
                        dates: [...selectedDates[e.getAttribute("key")].dates, `${date[1]}/${date[2]}/${date[0]}`],
                        level: selectedDates[e.getAttribute("key")].level + 1
                    }
                    updateCalendar();
                });
                e.addEventListener("contextmenu", e => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    e = e.target;
                    e.setAttribute("data-value", Number(e.getAttribute("data-value")) - 1);
                    const date = e.getAttribute("data-date").split("-");
                    if (selectedDates[e.getAttribute("key")].dates.length > 0)
                    {
                        selectedDates[e.getAttribute("key")].dates.shift();
                        selectedDates[e.getAttribute("key")].level -= 1;
                    }
                    updateCalendar();
                }); 
            }
        }
    );
    updateCalendar(true);
} else {
    alert("You are not on a GitHub profile page.");
}