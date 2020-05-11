import IHours from "../../common/interfaces/IHours";

export default {
    async getReport(data: IHours, type: string): Promise<any> {
        let id = "";

        switch (type) {
            case "intern":
                id = "HJewFyx0vL";
                break;
            case "extern":
                id = "H1gnFUldtI";
                break;
            default:
                id = "";
                break;
        }

        if (id === "") {
            return;
        }

        const postData = {
            template: { shortid: id },
            data: data,
            options: { reports: { save: true } },
        };

        const request = await fetch(
            "https://codezilla.jsreportonline.net/api/report",
            {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Basic c2FuZGVyQGNvZGV6aWxsYS5ubDphVFNSYzNATWp3UjZQU0A=",
                },
                body: JSON.stringify(postData),
            },
        )
            .then((response) => response.blob())
            .then((blob) => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = data.id + ".pdf";
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
        return request;
    },
};
