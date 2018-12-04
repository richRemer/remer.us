PUB = pub
RES = res
SRV = srv
FAVICON = pipe
NPM_BIN = node_modules/.bin

TARGET = $(patsubst $(PUB)/%, $(SRV)/%, $(shell find $(PUB) -type f))
PAGES = $(patsubst $(RES)/ui/%.pug, $(SRV)/%.html, $(wildcard $(RES)/ui/*.pug))
STYLES = $(subst $(RES), $(SRV), $(patsubst %.scss, %.css, $(wildcard $(RES)/style/[^_]*.scss)))
ICONS = $(foreach size, 16 32 48 64 96 128 192 256, $(SRV)/image/favicon-$(size).png)

default: build

install: systemd/remer.us.path systemd/remer.us.service systemd/remer.us-upgrade.service
	cp $^ /etc/systemd/system/
	systemctl daemon-reload
	systemctl restart remer.us remer.us.path
	systemctl enable remer.us remer.us.path

build: $(TARGET) $(PAGES) $(ICONS) $(STYLES)

clean:
	rm -fr srv/*

$(SRV)/%: $(PUB)/%
	@mkdir -p $(@D)
	cp $< $@

$(SRV)/image/favicon-%.png:
	@mkdir -p $(@D)
	rsvg-convert -w $(notdir $*) -h $(notdir $*) $(PUB)/image/$(FAVICON).svg > $@

$(SRV)/style/%.css: $(RES)/style/%.scss $(RES)/style/_*.scss
	@mkdir -p $(@D)
	$(NPM_BIN)/node-sass --cache-location /tmp $< > $@

$(SRV)/%.html: $(RES)/ui/%.pug
	@mkdir -p $(@D)
	$(NPM_BIN)/pug -Po $(@D) $< > /dev/null

.PHONY: default install build clean
