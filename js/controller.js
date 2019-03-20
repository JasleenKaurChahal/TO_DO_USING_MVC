function Controller() {
  this.model = new model();
  this.addToDo = function(caption, is_completed) {
    this.model.addToDo(caption, is_completed);
  };

  this.attachEventListener = function(event) {
    var self = this;
    var inputBox = document.getElementById("todo_list_item");
    inputBox.onkeypress = function(event) {
      if (event.keyCode == 13) {
        if (inputBox.value != "") {
          self.addToDo(inputBox.value, false);
          self.render();
          inputBox.value = "";
        }
      }
    };
  };

  this.render = function(event) {
    this.attachEventListener(); //will move this to line 8 to check if enter is pressed or not....if not pressed it will move to line 25

    var self = this; //to store value pointed by this in a variable that it doesnt change
    var list = document.getElementById("myUL");
    list.innerHTML = "";

    for (var i in this.model.todoCollectionArray) {
      var todoitem = this.model.todoCollectionArray[i];
      var li = document.createElement("li");
      li.setAttribute("class", "check");
      li.onmouseenter = function(event) {
        event.target.lastElementChild.style.display = "block";
      };
      li.onmouseleave = function(event) {
        event.target.lastElementChild.style.display = "none";
      };

      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.setAttribute("class", "status");
      if (todoitem.is_completed) {
        cb.setAttribute("checked", "true");
      }
      cb.onclick = function(index, event) {
        self.model.toggleToDo(index);
        self.render();
      }.bind(null, i);

      li.appendChild(cb);

      var sp = document.createElement("span");
      sp.innerHTML = todoitem.caption;
      sp.setAttribute("class", "title");
      if (todoitem.is_completed) {
        sp.classList.add("class", "striked");
      }
      sp.ondblclick = function(event) {
        var trgt = event.target;
        trgt.style.display = "none";
        var ip = trgt.parentNode.childNodes[2];
        ip.style.display = "block";
        ip.focus();
      };

      li.appendChild(sp);

      var iph = document.createElement("input");
      iph.type = "text";
      iph.value = todoitem.caption;
      iph.style.display = "none";
      iph.style.flex = "1";
      iph.setAttribute("class", "hidden-ip-box");
      iph.onkeypress = function(index, event) {
        var x = event.target;
        if (event.keyCode == 13) {
          if (x.value == "") {
            self.model.removeToDo(index);
          } else {
            self.model.editToDo(index, x.value);
          }
          self.render();
        }
      }.bind(null, i);
      iph.onblur = function(index, event) {
        var x = event.target;
        if (x.value == "") {
          self.model.removeToDo(index);
        } else {
          self.model.editToDo(index, x.value);
        }
        self.render();
      }.bind(null, i);

      li.appendChild(iph);

      var sp = document.createElement("span");
      sp.innerHTML = "X";
      sp.setAttribute("class", "cross");
      sp.onclick = function(index, event) {
        self.model.removeToDo(index);
        self.render();
      }.bind(null, i);

      li.appendChild(sp);

      list.appendChild(li);
    }
  };
}
