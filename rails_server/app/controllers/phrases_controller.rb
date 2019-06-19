class PhrasesController < ApplicationController
  def create
    @phrase = Phrase.new
    @phrase.pharse = params[:phrase]
    @phrase.mean = params[:mean]
    @phrase.user_id = 1
    @phrase.save
  end
end
