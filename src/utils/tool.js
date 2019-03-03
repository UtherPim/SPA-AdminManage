const isLeapYear=(year)=>{
    if(year%400 === 0 || (year%4 ===0 && year%100 !== 0) ){
        return true
    }else {
        return false
    }
}

const daysOfMonth=(month)=>{
    switch (month){
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        case 1:
            return isLeapYear(new Date().getFullYear())?29:28;
        default :
            return 30; 
                
    }
}

export default (
    (timeTamp, format, dateRange)=>{
         
        if(dateRange){
            switch (dateRange){
                case 'preDay':
                    return new Date(new Date().getTime()-24*60*60*1000).toLocaleDateString()
                case 'thisWeek':
                    return [
                        new Date(new Date().getTime()-(24*60*60*1000*(new Date().getDay()-1))).toLocaleDateString(),
                        new Date(new Date().getTime()+(24*60*60*1000*(7-new Date().getDay()))).toLocaleDateString()
                    ] 
                case 'preWeek':
                    return [
                        new Date(new Date().getTime()-(24*60*60*1000*(new Date().getDay()+6))).toLocaleDateString(),
                        new Date(new Date().getTime()-(24*60*60*1000*(new Date().getDay()))).toLocaleDateString(),
                    ]
                case 'thisMonth':
                    return [
                        new Date(new Date().getTime()-(24*60*60*1000*(new Date().getDate()-1))).toLocaleDateString(),
                        new Date(new Date().getTime()+(24*60*60*1000*(daysOfMonth(new Date().getMonth()) - new Date().getDate()))).toLocaleDateString(),
                    ]
                case 'preMonth':
                    return [
                        new Date(new Date().getTime()-(24*60*60*1000*(new Date().getDate()+daysOfMonth(new Date().getMonth()-1)-1))).toLocaleDateString(),
                        new Date(new Date().getTime()-(24*60*60*1000*(new Date().getDate()))).toLocaleDateString(),
                    ]
                default :
                    return new Date().toLocaleDateString()                   
            }
        }else{
            if(timeTamp && format){
                return new Date(timeTamp).toLocaleDateString().split('/').join(format)
            }else if(timeTamp && format === false){
                return new Date(timeTamp).toLocaleDateString()
            }else if(timeTamp === false && format){
                return new Date().toLocaleDateString().split('/').join(format)
            }else if(!timeTamp && !format){
                return new Date().toLocaleDateString()
            }
        }
    }
)