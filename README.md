# Reaktor

## Page Layout
```
    {{#Layout template="Page"}}
        {{#contentFor "header"}}
          <h1>Page Title</h1>
        {{/contentFor}}

        {{#contentFor "breadcrumb"}}
            <li>
                <a href="{{pathFor 'Dashboard'}}">Dashboard</a>
            </li>
            <li>Section</li>
            <li class="active">Page Title</li>
        {{/contentFor}}

        <!-- page content -->
        
        <!-- page content end -->

    {{/Layout}}
```