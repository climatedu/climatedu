#!/usr/bin/env python3

from PIL import Image
from pathlib import Path

d = Path('./data/people/avatars')

for fn in d.glob('*.jpg'):
  img = Image.open(fn)
  img.thumbnail((500, 500))
  img.save(fn, 'JPEG')
  img.close()