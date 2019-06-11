// The files and folders are represented as a tree
// Each node represents a directory where each leaf represents a file

const TreeModel = require("tree-model")
const config_all = require('./config.json')
const environment = process.env.NODE_ENV || 'development'
const config = config_all[environment];


class Level1 {
    constructor() {
        this.tree = new TreeModel();
        this.root = tree.parse({id=config['root_dir']})
    }

    getParent(name) {

    }

    addNode(name, directory) {
        let parent = this.root.first(function (node) {
            return node.model.id === directory;
        })

        node = this.tree.parse({id: name})
        parent.addChild(node)
    }

    delNode(name, directory) {
        // TODO this will have an edge case when we have two files with the same name
        let node = this.root.first(function (node) {
            return node.model.id === name;
        })

        node.drop()
    }
}


module.exports = new Level1();
