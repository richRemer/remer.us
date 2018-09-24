PUB = pub
SRV = srv
TARGET = $(patsubst $(PUB)/%, $(SRV)/%, $(shell find $(PUB) -type f))

default: build

build: $(TARGET)

clean:
	rm -fr srv/*

$(SRV)/%: $(PUB)/%
	@mkdir -p $(@D)
	cp $< $@

.PHONY: default build clean
