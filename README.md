# taxonomy-filter

This component creates a bottom-positioned full-width slider of tag categories.
If you click on the category, another slider that contains the tags within that
category will appear.

## How to use this component
```html
<div data-component="taxonomy-filter">
	<ul>
		<li data-tf-target="category1">Category 1</li>
		<li data-tf-target="category2">Category 2</li>
		<li data-tf-target="category3">Category 3</li>
		<li data-tf-target="category4">Category 4</li>
	</ul>
	<div class="taxo-lists" data-tf="tax-container">
		<ul data-tf-tax="category1">
			<!-- All tags for category 1 go here -->
		</ul>
		<ul data-tf-tax="category2">
			<!-- All tags for category 2 go here -->
		</ul>
		<ul data-tf-tax="category3">
			<!-- All tags for category 3 go here -->
		</ul>
		<ul data-tf-tax="category4">
			<!-- All tags for category 4 go here -->
		</ul>
		<div>
			<button data-tf="left"></button>
			<button data-tf="right"></button>
			<button data-tf="close"></button>
		</div>
	</div>
</div>
```
