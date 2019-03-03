const systemMenu=[
    {
        icon:"pie-chart",
        path:"/system/home",
        name:"Statistics Data",
        key:"home"
    },
    {
        icon:"desktop",
        path:"/system/office",
        name:"Office Manage",
        key:"office"
    },
    {
        icon:"user",
        path:"/system/user",
        name:"User Manage",
        key:"user",
        children:[
            {
                icon:"appstore",
                path:"/system/user/order",
                name:"Order Manage",
                key:"order"
            },
            {
                icon:"pay-circle",
                path:"/system/user/bill",
                name:"Bill Manage",
                key:"bill"
            },
            {
                icon:"switcher",
                path:"/system/user/vip",
                name:"Vip Manage",
                key:"vip"
            },
        ]
    },
    {
        icon:"team",
        path:"/system/team",
        name:"Team Build",
        key:"team",
        children:[
            {
                icon:"team",
                path:"/system/team/aTeam",
                name:"TeamA",
                key:"TeamA"
            },
            {
                icon:"team",
                path:"/system/team/bTeam",
                name:"TeamB",
                key:"TeamB"
            },
        ]
    },
    {
        icon:"file",
        path:"/system/file",
        name:"File Preview",
        key:"file"
    },
]

export default systemMenu;