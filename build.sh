#!/bin/bash
# 下载blowfish主题
wget https://github.com/nunocoracao/blowfish/archive/refs/heads/main.zip -O blowfish.zip
unzip -q blowfish.zip -d themes
mv themes/blowfish-main themes/blowfish
rm blowfish.zip
# 编译hugo站点
hugo --gc --minify
