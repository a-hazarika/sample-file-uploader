import { useRef, useState } from 'react';
import { storage } from '../firebase';
import styles from './Uploader.module.css';
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Uploader = () => {

    const filePickerRef = useRef(null);
    const [image, setImage] = useState(null);

    const addImage = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImage(readerEvent.target.result);
        }
    }

    const generateId = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const removeImage = () => {
        setImage(null);
    }

    const sendPost = async (e) => {
        e.preventDefault();

        try {
            if (image) {
                const storageRef = ref(storage, `uploads/${generateId(10)}`);
                uploadString(storageRef, image, 'data_url')
                    .then((snapshot) => {
                        console.log(snapshot)
                        getDownloadURL(storageRef).then(url => {                            
                            console.log("File uploaded at: ", url);
                        })
                    });

                removeImage();
            }

        } catch (e) {
            console.error("Error uploading image: ", e);
        }
    }

    return (
        <div className={styles.layout}>
            <form>
                <input type="file" ref={filePickerRef} onChange={addImage} />
                <button type="submit" onClick={sendPost}>Submit</button>
            </form>
            <img src={image} className={styles.imageSmall} alt="" />
        </div>

    )
}

export default Uploader