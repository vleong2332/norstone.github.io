---
title: Gallery | Grey 3D Basalt at Colorado Mountain Retreat
date: '2017-01-18 00:00:00'
layout: gallery
meta:
  description: 'The Springhaus designed Basalt 3D Fireplace is truly a show stopper
    in the midst of an incredibly well designed room, backdropped by the awe inspiring
    Rocky Mountains North of Denver.  '
permalink: "/gallery/project/springhaus-basalt3d-fireplace/"
product: Springhaus Basalt 3D Fireplace
gallery:
- alt: 'Springhaus Basalt 3D Grey Fireplace '
  title: 'Springhaus Basalt 3D Grey Fireplace '
  src: "assets/images/unsorted/norstone-lavastone-panel-fireplace-colorado.jpg"
  type: basalt-3d-ash-grey
  tags: []
- alt: 'Springhaus Basalt 3D Grey Fireplace '
  title: 'Springhaus Basalt 3D Grey Fireplace '
  src: "assets/images/unsorted/norstone-lava-stone-on-a-gas-insert-fireplace.jpg"
  type: basalt-3d-ash-grey
  tags: []
- alt: Springhaus Basalt 3D Grey Fireplace
  title: Springhaus Basalt 3D Grey Fireplace
  src: "assets/images/unsorted/norstone-lava-stone-stacked-panel-fireplace.jpg"
  type: basalt-3d-ash-grey
  tags: []
- alt: Springhaus Basalt 3D Grey Fireplace
  title: Springhaus Basalt 3D Grey Fireplace
  src: "assets/images/unsorted/norstone-lava-stone-on-a-fireplace.jpg"
  type: basalt-3d-ash-grey
  tags: []
other_galleries:
- basalt-ash-grey
- basalt-ebony
- basalt-3d-interiors
rows:
- image:
    alt: Springhaus Fireplace
    title: Springhaus Fireplace
    src: "/assets/images/FeaturedProjectDetails_Springhaus.png"
  heading: The Details
  body: This amazingly well designed residence North of Denver successfully marries
    two different types of stone in one jaw dropping fireplace.  Only surpassed by
    the amazing view of the Rocky Mountains out the windows, the clean grey lines
    of the 3D panel flank a vertical strip of lighter colored stone, beckoning all
    who see this installation to tilt their heads up to see and take in the amazing
    light fixtures and ceiling detail.
- image:
    alt: A Parade Worthy Project
    title: A Parade Worthy Project
    src: "/assets/images/Grey Basalt 3D Corner.png"
  heading: A Parade Worthy Project
  body: "\"Norstone delivers quality products that make a statement in any application.
    When it came time to select finishes for the Parade of Homes project's fireplace,
    we knew we had to use the 3D basalt tile. The mix of texture with modern clean
    lines was a perfect compliment to the home's mountain modern style. We continue
    to receive praise on how great the fireplace looks! It is always a pleasure working
    with Norstone’s amazing staff, they offer the support needed to make every project
    a success.\"  \n\n- Bekah Spaude\nInterior Designer\nSpringhaus Designs, LLC\n"
---
<h2 class="standard standard-gallery text-center">ROCKY MOUNTAIN MODERN FIREPLACE</h2>
<hr />
{% for row in page.rows %}
<div class="row">
  <div class="large-5 columns {% cycle '', 'large-push-7' %}">
    <img class="orbit-image" src="{{ site.url }}/{{ row.image.src }}" title="{{ row.image.title }}" alt="{{ row.image.alt }}">
  </div>
  <div class="large-7 columns {% cycle '', 'large-pull-5' %}">
    <h3 class="large color-primary">{{ row.heading }}</h3>
    <p class="text-justify">{{ row.body }}</p>
  </div>
  <hr />
</div>
{% endfor %}
