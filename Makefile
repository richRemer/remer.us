PUB = pub
RES = res
SRV = srv
FAVICON = pipe
TARGET = $(patsubst $(PUB)/%, $(SRV)/%, $(shell find $(PUB) -type f))
ICONS = $(foreach size, 16 32 48 64 96 128 192 256, $(SRV)/image/favicon-$(size).png)
STYLES = $(subst $(RES), $(SRV), $(patsubst %.scss, %.css, $(wildcard $(RES)/style/[^_]*.scss)))

default: build

build: $(TARGET) $(ICONS) $(STYLES)

clean:
	rm -fr srv/*

$(SRV)/%: $(PUB)/%
	@mkdir -p $(@D)
	cp $< $@

$(SRV)/image/favicon-%.png:
	@mkdir -p $(@D)
	rsvg-convert -w $(notdir $*) -h $(notdir $*) $(RES)/image/$(FAVICON).svg > $@

$(SRV)/style/%.css: $(RES)/style/%.scss
	@mkdir -p $(@D)
	sass --cache-location /tmp $< > $@

.PHONY: default build clean
