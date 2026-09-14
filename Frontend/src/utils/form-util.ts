

class FormUtil {

    // Converts any object into FormData, so a request can carry both fields and a file.
    // used in add/edit vacation, where plain JSON cannot carry the image files
    public toFormData(item: object): FormData {

        //new form
        const formData = new FormData();

        //loop all values in index with key & value
        for (const [key, value] of Object.entries(item)) {

            // Skip missing fields - otherwise they arrive at the server as the string undefined
            if (value === undefined || value === null) continue;

            // A file input gives a FileList; the server expects the single file inside it
            if (value instanceof FileList) formData.append(key, value[0]);

            // FormData carries strings only - this is why the backend does +vacation.price
            else formData.append(key, String(value));
        }
        return formData;
    }
}

export const formUtil = new FormUtil();