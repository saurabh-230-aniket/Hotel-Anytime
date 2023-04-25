export default () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    function logout(){
        localStorage.removeItem('currentUser');
        window.location.href='./login';
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg ">
                <a class="navbar-brand" href="/">Hotel Hustle</a>
                <button class="navbar-toggler b" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav" style={{marginRight: '5rem'}}>
                        {user ? (<div class="dropdown" >
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-user"></i>{user.name}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                            </ul>
                        </div>) : (<>
                            <li class="nav-item active">
                                <a class="nav-link" href="/register">Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/login">Login</a>
                            </li></>)}
                    </ul>
                </div>
            </nav>
        </>
    )
}                                                                                                                                                                                                   