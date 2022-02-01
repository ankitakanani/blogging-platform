const headerNavLinks = (user) => {
  var links = []
  // console.log(user)
  if (user==null) {

    links = [
      { navLink: '/', title: 'Blogs' },
      { navLink: '/login', title: 'LOGIN' }
    ]
  } else {
    links = [
      { navLink: '/write', title: 'Create Blog' },
      { navLink: '/', title: 'Blogs' },
      { navLink: '/logout', title: 'LOGOUT' },
    ]
  }
  return links
}


export default headerNavLinks
