import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

function HDR({ scene, manager }: { scene: THREE.Scene, manager: THREE.LoadingManager }) {


    new RGBELoader(manager)
        .setPath('/')
        .load('christmas_photo_studio.hdr', (texture) => {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;
        })

}
export default HDR;