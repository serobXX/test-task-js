const data = {
  services: [
    {
      id: 1,
      head: null,
      name: "Проф.осмотр",
      node: 0,
      price: 100.0,
      sorthead: 20,
    },
    {
      id: 2,
      head: null,
      name: "Хирургия",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 3,
      head: 2,
      name: "Удаление зубов",
      node: 1,
      price: 0.0,
      sorthead: 10,
    },
    {
      id: 4,
      head: 3,
      name: "Удаление зуба",
      node: 0,
      price: 800.0,
      sorthead: 10,
    },
    {
      id: 5,
      head: 3,
      name: "Удаление 8ого зуба",
      node: 0,
      price: 1000.0,
      sorthead: 30,
    },
    {
      id: 6,
      head: 3,
      name: "Удаление осколка зуба",
      node: 0,
      price: 2000.0,
      sorthead: 20,
    },
    {
      id: 7,
      head: 2,
      name: "Хирургические вмешательство",
      node: 0,
      price: 200.0,
      sorthead: 10,
    },
    {
      id: 8,
      head: 2,
      name: "Имплантация зубов",
      node: 1,
      price: 0.0,
      sorthead: 20,
    },
    {
      id: 9,
      head: 8,
      name: "Коронка",
      node: 0,
      price: 3000.0,
      sorthead: 10,
    },
    {
      id: 10,
      head: 8,
      name: "Слепок челюсти",
      node: 0,
      price: 500.0,
      sorthead: 20,
    },
  ],
};

const myData = data.services.map((item) => {
  return {
    ...item,
    open: item.head === null,
    ...(item.node && { dropdown: false }),
  };
});

function buildTree(data, parentId, container) {
  const serviceNode = document.createElement("div");

  data
    .filter((service) => service.head === parentId)
    .forEach((service) => {
      if (!service.open) return;

      const serviceItem = document.createElement("div");
      serviceItem.classList.add("service-item");

      const span = document.createElement("span");
      span.textContent = service.name;

      if (service.node) {
        const imgElement = document.createElement("img");
        imgElement.src = service.dropdown
          ? "images/chevron-down.svg"
          : "images/chevron-right.svg";
        span.prepend(imgElement);
        span.addEventListener("click", () => toggleDropdown(data, service.id));
      } else {
        span.classList.add("leaf");
      }

      serviceItem.appendChild(span);
      buildTree(data, service.id, serviceItem);
      serviceNode.appendChild(serviceItem);
    });

  container.appendChild(serviceNode);
}

function toggleDropdown(data, id) {
  let newData = data.map((item) => ({
    ...item,
    open: item.head === id ? !item.open : item.open,
  }));
  const index = data.findIndex((item) => item.id === id);
  newData[index].dropdown = !newData[index].dropdown;
  refreshTree(newData);
}

function refreshTree(data) {
  const treeContainer = document.getElementById("tree");
  treeContainer.removeChild(treeContainer.firstChild);
  buildTree(data, null, treeContainer);
}

window.onload = function () {
  const treeContainer = document.getElementById("tree");
  buildTree(myData, null, treeContainer);
};
