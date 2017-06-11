var _id;
var socket = io();
var svg = d3.select('#mindmap');
var g = svg.append('g').attr("transform", "translate(40,0)");
var tree = d3.tree().size([800, 600]);

function load(id) {
    _id = id;

    socket.on('nodes', onNodes);
    socket.emit('nodes', id);
}

function onNodes(data) {
    var root = d3.hierarchy(data);
    tree(root);
    draw(root);
}

function draw(root) {
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
        .attr("dy", 3)
        .attr("x", function (d) {
            return d.children ? -10 : 10;
        })
        .style("text-anchor", function (d) {
            return d.children ? "end" : "start";
        })
        .text(function (d) {
            return d.data.name
        })
        .on('click', function (d) {
            $('#edit-node-modal-name').val(d.data.name);
            $('#edit-node-modal-id').val(d.data.id);
            $('#edit-node-modal').modal();
        });
}

function addNode() {
    var $name = $('#add-node-modal-name');
    var name = $name.val();
    var parent = $('#add-node-modal-parent').val();

    if (name) {
        socket.emit('add-node', _id, {
            name: name,
            parent: parent
        });
    } else {
        $name.attr('placeholder', "Name is empty. Please enter new node's name");
        $name.focus();
    }
}

function editNode() {
    var $name = $('#edit-node-modal-name');
    var id = $('#edit-node-modal-id').val();
    var name = $name.val();

    if (name) {
        socket.emit('edit-node', _id, {
            id: id,
            name: name
        });
    } else {
        $name.attr('placeholder', "Name is empty. Please enter new node's name");
        $name.focus();
    }
}

$(window).on('resize', function () {
    var width = $('#mindmap-container').width();
    var height = $(document).height() * 0.8;

    svg.attr('width', width);
    svg.attr('height', height);
});
$(window).resize();