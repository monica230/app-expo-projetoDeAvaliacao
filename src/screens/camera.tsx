async function getImageCamera(idDaMovimentacao) {

    // pedir permissão
    const permission = await ImagePicker.requestCameraPermissionsAsync()

    // verifica se deu permisao
    if (permission.granted) {

        // abre camera e tira foto
        const imageInCamera = await ImagePicker.launchCameraAsync()

        // verifica se tirou uma foto
        if (imageInCamera?.assets) {

            const body = new FormData()
            body.append("file", {
                uri: imageInCamera.assets[0].uri,
                type: imageInCamera.assets[0].mimeType,
                name: imageInCamera.assets[0].fileName
            })

            body.append("motorista", "Joaozim")

            axios.put('', body, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })

        }
    }

} 