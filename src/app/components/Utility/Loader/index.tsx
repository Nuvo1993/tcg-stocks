import Image from "next/image";
import styles from './styles.module.css';

const Loader = () =>{
return (
    <div >
            <Image
              src={"/pokeball_loader.gif"}
              alt="logo"
              width={120}
              height={120}
            ></Image>
    </div>
)
}

export default Loader;