require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

RSpec.describe VisitsController, type: :controller do
  # This should return the minimal set of attributes required to create a valid
  # Visit. As you add validations to Visit, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    skip('Add a hash of attributes valid for your model')
  end

  let(:invalid_attributes) do
    skip('Add a hash of attributes invalid for your model')
  end

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # VisitsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  before do 
    @role = Role.find_by(name: 'admin')
    @user = FactoryGirl.create(:user, role_id: @role.id)
    sign_in(@user)
  end

  describe 'GET #index' do
    it 'assigns all visits as @visits' do
      visit = Visit.create! valid_attributes
      get :index, {}, valid_session
      expect(assigns(:visits)).to eq([visit])
    end
  end

  describe 'GET #show' do
    it 'assigns the requested visit as @visit' do
      visit = Visit.create! valid_attributes
      get :show, { id: visit.to_param }, valid_session
      expect(assigns(:visit)).to eq(visit)
    end
  end

  describe 'GET #new' do
    it 'assigns a new visit as @visit' do
      get :new, {}, valid_session
      expect(assigns(:visit)).to be_a_new(Visit)
    end
  end

  describe 'GET #edit' do
    it 'assigns the requested visit as @visit' do
      visit = Visit.create! valid_attributes
      get :edit, { id: visit.to_param }, valid_session
      expect(assigns(:visit)).to eq(visit)
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Visit' do
        expect do
          post :create, { visit: valid_attributes }, valid_session
        end.to change(Visit, :count).by(1)
      end

      it 'assigns a newly created visit as @visit' do
        post :create, { visit: valid_attributes }, valid_session
        expect(assigns(:visit)).to be_a(Visit)
        expect(assigns(:visit)).to be_persisted
      end

      it 'redirects to the created visit' do
        post :create, { visit: valid_attributes }, valid_session
        expect(response).to redirect_to(Visit.last)
      end
    end

    context 'with invalid params' do
      it 'assigns a newly created but unsaved visit as @visit' do
        post :create, { visit: invalid_attributes }, valid_session
        expect(assigns(:visit)).to be_a_new(Visit)
      end

      it "re-renders the 'new' template" do
        post :create, { visit: invalid_attributes }, valid_session
        expect(response).to render_template('new')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) do
        skip('Add a hash of attributes valid for your model')
      end

      it 'updates the requested visit' do
        visit = Visit.create! valid_attributes
        put :update, { id: visit.to_param, visit: new_attributes }, valid_session
        visit.reload
        skip('Add assertions for updated state')
      end

      it 'assigns the requested visit as @visit' do
        visit = Visit.create! valid_attributes
        put :update, { id: visit.to_param, visit: valid_attributes }, valid_session
        expect(assigns(:visit)).to eq(visit)
      end

      it 'redirects to the visit' do
        visit = Visit.create! valid_attributes
        put :update, { id: visit.to_param, visit: valid_attributes }, valid_session
        expect(response).to redirect_to(visit)
      end
    end

    context 'with invalid params' do
      it 'assigns the visit as @visit' do
        visit = Visit.create! valid_attributes
        put :update, { id: visit.to_param, visit: invalid_attributes }, valid_session
        expect(assigns(:visit)).to eq(visit)
      end

      it "re-renders the 'edit' template" do
        visit = Visit.create! valid_attributes
        put :update, { id: visit.to_param, visit: invalid_attributes }, valid_session
        expect(response).to render_template('edit')
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested visit' do
      visit = Visit.create! valid_attributes
      expect do
        delete :destroy, { id: visit.to_param }, valid_session
      end.to change(Visit, :count).by(-1)
    end

    it 'redirects to the visits list' do
      visit = Visit.create! valid_attributes
      delete :destroy, { id: visit.to_param }, valid_session
      expect(response).to redirect_to(visits_url)
    end
  end

  # describe "Get #view_assigned_visits" do
  #   before do
  #     another_user = FactoryGirl.create(:user, email: 'another_user@prrohealth.com')
  #     @another_visits =  FactoryGirl.create(:visit, assignee_id: another_user.id)
  #     @visit = FactoryGirl.create(:visit, assignee_id: @user_id)
  #   end

  #   it "view user assigned tasks" do
  #     get :view_assigned_visits, {}, valid_session
  #     expect(assigns(:visits)).to eq([@visit])
  #   end
  # end
end