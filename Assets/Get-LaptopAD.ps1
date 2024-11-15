Import-Module ActiveDirectory

$ComputerOU = 'OU=Elementary Schools,OU=SCS Computers,OU=SCS,DC=schools,DC=scs,DC=k12,DC=va,DC=us'
#$ComputerOU = 'OU=Laptops,OU=RIVES,OU=Elementary Schools,OU=SCS Computers,OU=SCS,DC=schools,DC=scs,DC=k12,DC=va,DC=us'

Get-ADComputer -SearchBase $ComputerOU -filter { enabled -eq $true } -Properties name,
customHardwareModel,
customHardwareVendor,
operatingSystem,
operatingSystemVersion,
Description,
customLastLoggedOnUser,
customLastLoggedOnUserDate,
serialNumber,
distinguishedName |
Select-Object Name,
customHardwareModel,
customHardwareVendor,
OperatingSystem,
OperatingSystemVersion,
Description,
customLastLoggedOnUser,
customLastLoggedOnUserDate,
serialNumber,
distinguishedName | 
Export-Csv ComputerADList.csv