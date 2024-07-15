import { defineStore } from 'pinia';

export const useTreeStore = defineStore('treeStore', {
    state: () => ({
        checkedNodes: []
    }),
    actions: {
        setCheckedNodes(nodes) {
            this.checkedNodes = nodes;
        },
        getCheckedNodes() {
            return this.checkedNodes;
        }
    }
});
