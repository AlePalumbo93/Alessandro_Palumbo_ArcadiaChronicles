import  logo  from "../../media/arcadiaChronicles.png";

export default function Navbar() {
   
   return(
      <>
      <nav className="navbar navbar-expand-lg py-0">
         <div className="container-fluid">
            <a className="navbar-brand" href="#"><img className="logo" src={logo} alt="" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
               <div>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <a className="nav-link active fontNav" aria-current="page" href="#">Home</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link fontNav" href="#">Link</a>
                     </li>
                  </ul>
               </div>
               <div className=" w-75">
                  <form className="d-flex" role="search">
                  <input className="form-control me-2 rounded-5 searchBar"  type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success rounded-5 fontNav" type="submit">Search</button>
                  </form>
               </div>
               <div className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle fontNav" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     Login
                  </a>
                  <ul className="dropdown-menu">
                     <li><a className="dropdown-item" href="#">Action</a></li>
                     <li><a className="dropdown-item" href="#">Another action</a></li>
                     <li><hr className="dropdown-divider"/></li>
                     <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
               </div>
            </div>
         </div>
      </nav>
      </>
   )
}