hospitality - welcome your guests
=========

Every visitor to your website is unique. You should treat them that way! Hospitality gives you the tools to modify page behavior and copy based on what type of visitor is currently viewing the page. There is default handling for:

- new visits
- return visits

It is trivial to implement your own types like `free user` or `paid user`.

## Implementation

Put this at the bottom of your page:

{% gist 7883774 %}

### Config

A new vs. return visit is more than just refreshing the page. To differentiate a return visit, this waits an hour after the first visit to treat the visitor as a return visitor. You can modify the wait via.

```javascript
hospitality.init({
  wait: 1000 * 60 // wait in ms.
});
```

By default, users are tracked on a per-domain basis. If you'd like to change that behavior, you can via:

```javascript
hospitality.init({
    domain: '.mydomain.com'
});
```

## Testing

1. Startup a web server from the root directory:

```bash
python -m SimpleHTTPServer
```

2. Go to the [test page](http://lvh.me:8080/test).
