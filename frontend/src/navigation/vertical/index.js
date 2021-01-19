export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Second Page',
    route: 'second-page',
    icon: 'FileIcon',
  },
  {
    title: 'Marcas',
    icon: 'MailIcon',
    children: [
      {
        title: 'Listado',
        route: {name: 'marcas'},
      }
    ]
  }
]
