function newTab(event, id) {
    event.preventDefault()

    let nextId = cycle[(cycle.indexOf(id) + 1) % cycle.length]
    document.getElementById(nextId).focus({ focusVisible: true })
}

cycle.forEach((id) => {
    document.getElementById(id).addEventListener('keydown', (event) => {
        console.log(event.code)
        if (event.code === 'Tab') newTab(event, id)
    })
})