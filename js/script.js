(function($) {
    // invoice number
    $('#invoice-number').html(moment().format('YYYYMMDDHHmmss'));

    // invoice date
    $('#date').html(moment().format('DD/MM/YYYY'));

    // switch between estimate and invoice
    $('#switch').on('change', function(e) {
        e.preventDefault();
        $('#selected').html($(this).val());
    });

    // add row to table invoice items
    $('#add').click(function(e) {
        e.preventDefault();

        var output = [
            '<tr class="item-row">',
                '<td>',
                    '<div class="remove-wrapper">',
                        '<a href="#" class="btn remove-btn hide-printing">Supprimer</a>',
                        '<textarea placeholder="Description"></textarea>',
                    '</div>',
                '</td>',
                '<td><input class="qty" type="number" min="0" placeholder="0"></td>',
                '<td><input class="cost" type="text" placeholder="0"></td>',
                '<td><span class="price"></span></td>',
            '</tr>'
        ];

        $('#invoice-items tr').eq(-1).before(output.join(''));
    });

    // remove row to table invoice items
    $(document).on('click', '.remove-btn', function(e) {
        e.preventDefault();
        if (window.confirm("Êtes-vous sûr ?")) {
            $(this).parents('.item-row').remove();
        }
        updateTotal();
    });

    // update price
    $(document).on('blur', '.cost, .qty, .discount', function(e) {
        var row = $(this).parents('.item-row');
        var qty = row.find('.qty').val();
        var cost = row.find('.cost').val();
        var price =  cost * qty;
        row.find('.price').html(currency(price));
        row.find('.cost').val(currency(cost));

        updateTotal();
    });

    // print
    $('#print').click(function(e) {
        e.preventDefault();
        window.print();
    });

    var updateTotal = function() {
        var total = 0;
        var discount = $('#discount').val();
        $('.price').each(function() {
            price = $(this).html();
            if (price) total += parseFloat(price);
        });
        total = total - (total * discount / 100);
        $('#total').html(currency(total));
    };

    var currency = function(value) {
        return Number(value).toFixed(2);
    };

})(jQuery);
