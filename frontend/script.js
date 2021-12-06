fetch('http://localhost:3000/api/posts/all')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });

  function appendData(data) {

     for (var i = 0; i < data.length; i++) {
          const li = document.createElement("li");
          const body = document.createElement("li");

          // and give it some content
          const title = document.createTextNode(data[i].title);
          const bodyContent = document.createTextNode(data[i].body);
          // add the text node to the newly created div
          li.appendChild(title);
          const li2 = document.createElement("li");
          li2.appendChild(bodyContent)
          li.appendChild(li2);
          // add the newly created element and its content into the DOM
          const ul = document.getElementById("posts");
          document.body.insertBefore(li, ul);
          //document.body.appendChild(body);
     }
   }