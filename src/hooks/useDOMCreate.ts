import { onUnmounted } from 'vue'

const useDOMCreate = function (nodeId: string | HTMLDivElement) {
  if (typeof nodeId === 'string') {
    const node = document.createElement('div')
    node.id = nodeId
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  } else {
    nodeId.id = 'message'
    document.body.appendChild(nodeId)
    onUnmounted(() => {
      document.body.removeChild(nodeId)
    })
  }

}

export default useDOMCreate