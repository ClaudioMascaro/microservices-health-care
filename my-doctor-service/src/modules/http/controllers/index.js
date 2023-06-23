import affiliateControllerFactory from "./doctors.js"

export default function controllersFactory ({ core }) {
  const { affiliateDoctor } = core

  const affiliateController = affiliateControllerFactory({ affiliateDoctor })

  return {
    affiliateController
  }
}
