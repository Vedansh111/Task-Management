import Swal from 'sweetalert2';

function ErrorPage() {
    Swal.fire({
        icon: 'error',
        title: "Oops...",
        text: 'Page not found',
        width: 510,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
              rgba(0,0,123,0.4)
              url("https://media.tenor.com/-AyTtMgs2mMAAAAi/nyan-cat-nyan.gif")
              left top
              123rem
            `,
    })

    return (
        <div className=' bg-black w-full h-screen flex items-center justify-center font-mono text-5xl'>
            <div className='text-white'>Error 404...</div>
        </div>
    )

}

export default ErrorPage