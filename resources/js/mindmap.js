var _id;
var _data;
var width = $('#mindmap-container').width();
var height = $(document).height() * 0.8;
var svg = d3.select('#mindmap')
    .attr('width', width)
    .attr('height', height);
var g = svg.append('g').attr("transform", "translate(40,0)");
var tree = d3.tree();

function load(id) {
    _id = id;

    $.get('/mindmap/' + id + '/nodes', function (data) {
        onNodes(data);
    });
}

function onNodes(data) {
    _data = data;

    var root = d3.hierarchy(data);
    draw(root);
}

function draw(root) {
    g.selectAll("*").remove();

    tree = tree.size([height, width * 0.8]);
    tree(root);

    var link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d) {
            return "M" + d.y + "," + d.x + "C" + (d.y + d.parent.y) / 2 + "," + d.x + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x + " " + d.parent.y + "," + d.parent.x;
        });

    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", function (d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });
    node.append("circle")
        .attr("r", 8)
        .on('click', function (d) {
            $('#add-node-modal-parent').val(d.data.id);
            $('#add-node-modal').modal();
        });
    node.append("text")
        .attr("dy", -10)
        .text(function (d) {
            return d.data.name
        })
        .on('click', function (d) {
            $('#edit-node-modal-name').val(d.data.name);
            $('#edit-node-modal-id').val(d.data.id);
            $('#edit-node-modal').modal();
        });
}

$(window).on('resize', function () {
    width = $('#mindmap-container').width();
    height = $(document).height() * 0.8;

    svg.attr('width', width);
    svg.attr('height', height);

    if (_data) {
        var root = d3.hierarchy(_data);
        draw(root);
    }
});