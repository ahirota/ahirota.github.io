# Tangleteezer Japan
Tangleteezer Japan is the japanese branch of the Tangleteezer hairbrush brand. When we relaunch the site, we needed a standlaone platform that could be used for e-commerce, but also had the ability to create content for newsletters and how-to articles. Given that Shopify was not yet as widely used, we had to come up with a custom solution to achieve the desired output.

The main tools and technologies used are:
- PHP
  - [EC-Cube](https://github.com/ec-cube)
  - Wordpress
- MySQL
- Docker

## Custom Solution, Wordpress sub-system
The solution we came up with was to install Wordpress as a subsystem within EC-Cube, the open source E-Commerce platform we chose. This made the most sense for our use case as Wordpress was easy to install and deploy, and perhaps more importantly, is based on PHP, and thus shared a common programming language with EC-Cube.

![System Diagram for Tangleteezer JP](/assets/preapp/ttjp.png)

By adding Wordpress as a subsystem, we were able to expose it's Loop code internally, and create a link heirarchy that would group and navigate through wordpress posts and render them on the front end. Given that Wordpress already supported pagination and posts, all we had to do was feed the appropriate information to the system and render the content where appropriate.

Here's a paginated section of posts with the "news" (or default) category.
![Paginated News Articles](/assets/preapp/ttjp-news-loop.png)

Here's an article that is being rendered on the page, using Wordpress native functionality to inject the post into the section with the class: `postContent`.
![Rendered Content with Source Code](/assets/preapp/ttjp-content.png)

## The Outcome
When I left the company, the standalone platform was responsible for about 30% of all sales in japan, competing against Amazon, Rakuten, and other e-commerce platforms. To date, I am very proud of the custom solution I built.

### Site Link
[Here's a link to this site](https://tangleteezer.jp/)

<ContactCard />