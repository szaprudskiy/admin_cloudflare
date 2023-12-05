interface AccountData {
  accountName: string
  accountKey: string
}

interface DomainData {
  domainName: string
  domainId: string
}

export interface FormData {
  account: AccountData
  domain: DomainData
}

export interface Account {
  account: {
    accountName: string
    accountKey: string
  }
  domain: {
    domainName: string
    domainId: string
  }
}
