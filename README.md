# Hotel App for Staff and Managers


## Installation

```
// clone project
git clone https://github.com/PlusMore/hotel.git
cd hotel
make start (ensure mongodb plusmore is running first)
```


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


## Branching Model
We follow this(http://nvie.com/posts/a-successful-git-branching-model/), but use pull requests instead of -no-ff merges. This is for peer code review and easy to find info on Github. 

With maintaining a qa-copy, dev-copy, an production copy, this just makes things easier, and having a common resource reduces the learning curve as some devs are already familiar with the pattern.


## Versioning
How do you know what version number you should be updating to?

http://semver.org/

MAJOR version when you make incompatible API changes,
MINOR version when you add functionality in a backwards-compatible manner, and
PATCH version when you make backwards-compatible bug fixes.

In an application, this generally means more of the following: 
MAJOR version when we decide it's time because the application changes in a significant way,
MINOR version when you add a feature, and
PATCH version when you make bug fixes.

Major version needs the most explanation. An example of when we might do it is if we were to make device into a thin wrapper for iframes, and separate different pages into multiple apps. Another reason might be to align with a business strategy. 

