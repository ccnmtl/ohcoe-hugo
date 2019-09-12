Project OHCOE is a web-based resource to help teach dental practitioners how to
help their patients that may an opioid problem.

Visit [About Project OHCOE](https://ohcoe.ctl.columbia.edu/about/) for more
information regarding the project.

---

This site is built using Hugo, and uses a number of Javascript dependencies to
compile JS, SCSS, and run tests. It uses Cypress to run tests.

In brief:
* `make runserver`: Brings up a test server, and starts a daemon to watch Hugo project files. It will rebuild the site when changes occur, and serve them out of memory for speed.
* `make build-scss`: Brings up a Node daemon to watch the SCSS directory and rebuild when there are changes.
* `make watch`: Brings up a daemon the watch src js files and compile them using Webpack into a single asset.
* `make cypress`: Opens the Cypress GUI. This also watches the repo, and will rerun the active test when files update. Note that this requires the test server to be running.

Please see the Makefile and `js.mk` for additional make targets and descriptions of what they do.
