export interface FormData {
  account?: {
    accountName: string
    accountKey: string
  }
  domain?: {
    domainName: string
    domainId: string
  }
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
