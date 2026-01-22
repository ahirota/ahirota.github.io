---
next: false
---

# Dormify
Dormify is a brand that was acquired by Williams-Sonoma, Inc. in May of 2025. It was built up to that point on the Shopify platform but the plans were to bring it into the wider WSI ecosystem. In order to rebrand under WSI, Dormify needed a fast launch of an interim site that could be built on top of the existing Shopify structure. My partner and I were asked to volunteer due to our previous experience with Shopify. 

The main tools and technologies used are:
- Shopify
  - Liquid
- HTML
- CSS
- Javascript

## Main Issues
The CTO of Williams-Sonoma asked my supervisor for assistance from one or two developers that had Shopify experience and cited a day's worth of work. However, after agreeing to assist it became apparent that the request was actually to fully overhaul the site and put up a temporary one instead.

This proved to be difficult as they desired to keep certain routes available for SEO purposes while removing all the previous content and adding interactivity to 7 new pages. The Creative Design team passed approved layout files to us with very little overlap with the existing assets provided to us. 

All of a sudden, the task required every page to have multiple custom liquid components and schema rewrites to achieve the desired look. Everything needed to be linked, tagged, and drive user engagement to the main PB Teen site. We had to buckle down and get to it.

### Custom Liquid Responsive Hero Banner
One of these custom liquid components that I'm particularly proud of is this innocuous looking one.

![Dormify Homepage Hero Banner](/assets/wsi/dormify/hp-desktop.png)

![Dormify Homepage Hero Banner in Mob](/assets/wsi/dormify/inspo-desktop.png)

This hero banner exists on most of the pages and is the same component on all of them, but the part that I am proud of is the modular functionality that can be entirely controlled by any non-technical admin user. Their key visual difference only being noticeable once you view the site from your mobile device.

![Dormify Homepage Hero Banner in Mobile](/assets/wsi/dormify/hp-mobile.png)

![Dormify Inspiration Hero Banner in Mobile](/assets/wsi/dormify/inspo-mobile.png)

I implemented the following features from scratch:
- Togglable Responsiveness for whether the image should be above or below in mobile view
- Selectable images for both desktop and mobile views
- Custom linking for both the CTA Buttons in the text block and the image
- Taggable Links for user tracking

## The Outcome
With the marketing deadline only a week away, my partner developer and I completely overhauled the site, stripping it down, restyling, and writing some custom shopify templates and components to meet the deadline. We launched on time, with only minor callouts to text and legal copy, and received personal thank yous from the CTO and the Brand Managers. 

Additionally, one week after the relaunch we saw an average of 30% click through rate from Dormify visitors to the PB Teen main site.

As developers in this instance, our goal was not just to overhaul and relaunch the site, but also to make sure that it would easy to interact with for any non-technical administrative user responsible for maintaining the site and we achieved this.

You can check out Dormify [here](https://www.dormify.com/).

<ContactCard />