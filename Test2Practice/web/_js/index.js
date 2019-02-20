$(function () {
    var $name = $("#name");
    var $author = $("#author");
    var $price = $("#price");
    var $quantity = $("#quantity");
    var $date = $("#date");
    var url = "http://rest.learncode.academy/api/cis3360/Exam2Practice";
    var $books = $("#books");
    var counter = 0;
    var errorMessage = "";
    var arrayOfBooks = [];


    $("#getBook").click(function () {
        $.ajax({
            type: "GET",
            url: url,
            success: function (books) {

                $.each(books, function (index, book) {
                    $books.append('<li>Name: ' + book.name + ', Author: ' + book.author + ', Price: $' + book.price + ', Quantity: ' + book.quantity + ', Date: ' + book.date + ', ISBN: ' + book.id + '</li>');
                })

            },
            error: function () {
                alert("Wrong url")

            }

        })
    });


    $("#addBook").click(function () {
        var aBook = {
            "name": $name.val(),
            "author": $author.val(),
            "price": $price.val(),
            "quantity": $quantity.val(),
            "date": $date.val()
        };

        if ($name === "") {
            errorMessage = "A Book name is required";
            $("#name").focus();
        }
        if (errorMessage == "") {
            arrayOfBooks[counter] = aBook;
            counter++;
            console.log(arrayOfBooks);
        }

        $.ajax({
            type: "POST",
            url: url,
            data: aBook,
            success: function (newBook) {
                $books.append('<li>Name: ' + newBook.name + ', Author: ' + newBook.author + ', Price: $' + newBook.price + ', Quantity: ' + newBook.quantity + ', Date: ' + newBook.date + ', ISBN: ' + newBook.id + '</li>');
                $('#bookID').val(newBook.id);


            },
            error: function () {
                alert("error saving order ");
            }


        });


    });

    $("#deleteBook").click(function () {
        var book = $("#bookID").val();
        var bookEndpoint = url + "/" + book;
        // alert(book);

        $.ajax({
            type: "DELETE",
            url: bookEndpoint,
            success: function (result) {
                console.log(result);
                getBookOrders();


            },
            error: function (result) {
                alert(result.statusText + " " + result.status);
            }
        });
    });


    $("#editBook").click(function () {

        var book = $("#bookID").val();
        var bookEndpoint = url + "/" + book;
        var aBook = {
            name: $('#name').val(),
            author: $('#author').val(),
            price: $('#price').val(),
            quantity: $('#quantity').val(),
            date: $('#date').val()
        };

        $.ajax({
            type: "PUT",
            url: bookEndpoint,
            data: aBook,
            success: function (result) {
                console.log(result);
                getBookOrders();
            },
            error: function (result) {
                console.log("ERROR " + result.statusText + " " + result.status);
            }
        });
    });

    // This is how you check the book Inventory for JQuery
    $("#bookCount").click(function () {
        // alert(arrayOfBooks.length);
        $("#count").html(arrayOfBooks.length);
    })


    function getBookOrders() {
        $.ajax({
            type: "GET",
            url: url,
            success: function (result) {
                $("#books").html(renderHTML(result));
            },
            error: function (result) {
                console.log(result.statusText + " " + result.status);
            }
        });

        function renderHTML(data) {
            var result = "";
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var name = data[i].name;
                var author = data[i].author;
                var price = data[i].price;
                var quantity = data[i].quantity;
                var date = data[i].date;
                result += '<li>Name: ' + name + ', Author: ' + author + ', Price: $' + price + ', Quantity: ' + quantity + ', Date: ' + date + ', ISBN: ' + id + '</li>';
            }

            return result
        }
    }
})


