# Ruiqi's Personal Website

The idea is to build the website in the easiest way. From my point of view, compared to the *Jekyll* method, it is even more convenient to use [Typora](typora.io) to generate html file from markdown notes. Besides, you can maintain a more straightforward folder structure in your website.

**The as-easy-as-possible way:**

1. Download Typora.
2. Choose a Typora theme you like.
3. Write your blogs in Typora.
4. Export them to HTML.
5. Put HTMLs in your github page repo.

However, in this way all your html files will contain an identitle stylesheet, which is somehow redundant. Besides, you can only use Typora's theme, and it's hard to change the theme for your established website.

**The somewhow-more-concise way:**

1. Download Typora.

2. Go to "Preferences"-"Export":

   1. Create a new output type by clicking the plus sign.

   2. Select "HTML (without styles)".

   3. In the "Append in \<head/\>" box, enter:

      ```html
      <link rel="stylesheet" type="text/css" href="/css/global.css">
      <link rel="stylesheet" type="text/css" href="css/local.css">
      ```

      This will allow you to format all your html pages by a single theme `global.css` under the root of your website. Besides, it allows you to set the theme for a specific page by providing a `local.css` for it.

3. Write your blogs in Typora, then export them with the type you create.

4. Create a folder `/css` under the root of your github pages repo. Find a css you like, rename it to `global.css` and put it under this folder.

   (Note: if you are as lazy as me, you can go to "themes"-"open themes folder" and find Typora's default themes there)

5. Whenever you need to display a page with additional format, create a folder `/css` in the same place and put in a `local.css`.

You can add javascripts to all your pages by modifying "Append in \<head/\>" too. For example, I add some syntax highlighting with `highlight.js`:

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/stackoverflow-light.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>
```

You can also modify the "Append in \<body/\>" section to put something at the bottom of your pages, e.g. a link to the homepage.