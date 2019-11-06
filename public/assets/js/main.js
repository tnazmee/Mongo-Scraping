$(document).ready(() => {
    $(`.sidenav`).sidenav();
    $('.modal').modal();

    $(document).on(`click`, `#scrape`, (event) => {
        event.preventDefault();

        $.get(`/scrape`, result => {
            console.log(`Scraped 'The Onion' for articles`);
            location.reload();
        });
    });

    $(document).on(`click`, `#clear`, (event) => {
        event.preventDefault();

        $.get(`/clear`, result => {
            console.log(`Cleared articles`);
            location.reload();
        });
    });

    $(document).on(`click`, `.save-article`, function (event) {
        event.preventDefault();

        $.post(`/save/${$(this).data(`id`)}`, result => {
            console.log(`Saved article`)
            location.reload();
        });
    });

    $(document).on(`click`, `.unsave-article`, function (event) {
        event.preventDefault();

        $.post(`/unsave/${$(this).data(`id`)}`, result => {
            console.log(`Unsaved article`);
            location.reload();
        });
    });

    $(document).on(`click`, `.remove-note`, function (event) {
        event.preventDefault();

        $.post(`/unnote/${$(this).data(`id`)}`, result => {
            console.log(`Removed note`);
            location.reload();
        });
    });

    $(document).on(`click`, `.add-note`, function (event) {
        event.preventDefault();

        $.post(`/note/${$(this).data(`id`)}`, result => {
            console.log(`Added note`);
            location.reload();
        });
    });
});