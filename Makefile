PUB = pub
RES = res
SRV = srv
FAVICON = pipe
TARGET = $(patsubst $(PUB)/%, $(SRV)/%, $(shell find $(PUB) -type f))
ICONS = $(foreach size, 16 32 48 64 96 128 192 256, $(SRV)/image/favicon-$(size).png)

default: build

build: $(TARGET) $(ICONS)

clean:
	rm -fr srv/*

$(SRV)/%: $(PUB)/%
	@mkdir -p $(@D)
	cp $< $@

$(SRV)/image/favicon-%.png:
	@mkdir -p $(@D)
	rsvg-convert -w $(notdir $*) -h $(notdir $*) $(RES)/image/$(FAVICON).svg > $@

.PHONY: default build clean
