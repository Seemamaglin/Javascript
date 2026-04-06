let list=document.getElementById('list');
let items=document.querySelectorAll('li');

let draggedItem=null;

items.forEach(item=>{
    item.addEventListener('dragstart',()=>{
        draggedItem=item;
        item.classList.add('dragging');
    });
    item.addEventListener('dragend',()=>{
        draggedItem=null;
        item.classList.remove('dragging');
    });
});

items.forEach(item=> {
    item.addEventListener('dragover',(e)=>{
        e.preventDefault();
        item.classList.add('over');
    });
    item.addEventListener('dragleave',()=>{
        item.classList.remove('over');
    });
});

items.forEach(item=>{
    item.addEventListener('drop',()=>{
        item.classList.remove('over');
    
    if (draggedItem===item) return;

    let children=Array.from(list.children);
    let draggedIndex=children.indexOf(draggedItem)
    let targetIndex=children.indexOf(item)

    if(draggedIndex < targetIndex){
        list.insertBefore(draggedItem,children[targetIndex+1])
    } else{
        list.insertBefore(draggedItem,item)
    }
    });

});