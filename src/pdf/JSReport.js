export default {
    async getReport(data) {
        const postData = {
            template: { shortid: "HJewFyx0vL" },
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
