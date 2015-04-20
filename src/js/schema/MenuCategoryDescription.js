Schema.MenuCategoryDescription = new SimpleSchema({
  _id: {
    type: String
  },
  name: {
    type: String,
    label: "Category Name"
  },
  description: {
    type: String,
    label: "Description (Optional)",
    optional: true
  }
});
