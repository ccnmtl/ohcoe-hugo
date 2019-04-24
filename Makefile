STAGING_URL=https://ohcoe.stage.ctl.columbia.edu/
PROD_URL=https://ohcoe.ctl.columbia.edu/
STAGING_BUCKET=ohcoe.stage.ctl.columbia.edu
PROD_BUCKET=ohcoe.ctl.columbia.edu

JS_FILES=themes/ohcoe/static/js/src

all: eslint

include *.mk

.PHONY: clean
