function ToDo(caption, is_completed) {
  this.caption = caption;
  this.is_completed = is_completed;
  this.toggle = function() {
    this.is_completed = !this.is_completed;
  };
}

function model() {
  this.todoCollectionArray = [];

  this.addToDo = function(caption, is_completed) {
    var item = new ToDo(caption, is_completed);
    this.todoCollectionArray.push(item);
  };

  this.removeToDo = function(index) {
    this.todoCollectionArray.splice(index, 1);
  };

  this.toggleToDo = function(index) {
    this.todoCollectionArray[index].toggle();
  };
  this.editToDo = function(index, newCaption) {
    this.todoCollectionArray[index].caption = newCaption;
  };
}
