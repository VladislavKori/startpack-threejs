import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

function HDR({ scene }: { scene: THREE.Scene }) {

    new RGBELoader()
        .setPath('/')
        .load('christmas_photo_studio.hdr', (texture) => {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;
        })

}
export default HDR;